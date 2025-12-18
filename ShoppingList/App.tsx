import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { firestore, collection, addDoc, SHOPPINGLIST, serverTimestamp, query, orderBy, onSnapshot, setDoc, doc } from './firebase/Config';
import { useEffect, useState } from 'react';
import ItemRow from './components/ItemRow';
import { ShoppingItem } from './types/ShoppingItem';



export default function App() {
  const [newItem, setNewItem] = useState<string>('')
  const [items, setItems] = useState<ShoppingItem[]>([])


  useEffect(() => {
    const colRef = collection(firestore, SHOPPINGLIST)
    const q = query(colRef, orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snap) => {
      const rows: ShoppingItem[] = snap.docs.map(d => {
        const data = d.data() as ShoppingItem
        return data
      })
      setItems(rows)
    }, (err) => {
      console.error('onSnapshot error', err)
    })

    return () => { unsubscribe() }
  }, [])


  async function handleAdd(): Promise<void> {
    if (!newItem.trim()) return;
    try {
      
      await setDoc(doc(firestore, SHOPPINGLIST, newItem), {
        item: newItem,
        createdAt: serverTimestamp(),
        found: false
      })
      setNewItem('')
    } catch (error) {
      console.error('Failed to add item', error)
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder='Add new item...'
          value={newItem}
          onChangeText={setNewItem}
        />
        <Button title='Add' onPress={handleAdd} />
      </View>
      <ScrollView style={{ width: '100%', marginTop: 8 }}
        contentContainerStyle={{ paddingBottom: 16 }}>
          { items.map((item, index) => (
            <ItemRow key={index} {...item}/>
          ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8,
    marginVertical: 40
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  }
});
