import { View, Text, StyleSheet, Switch, Button } from 'react-native'
import React, { useState } from 'react'
import { ShoppingItem } from '../types/ShoppingItem'
import { firestore, deleteDoc, doc, SHOPPINGLIST, collection, updateDoc } from '../firebase/Config'

export default function ItemRow(Item: ShoppingItem) {
    const [found, setFound] = useState<boolean>(Item.found)


    async function toggleSwitch(): Promise<void> {
        
        const docRef = doc(firestore, SHOPPINGLIST, Item.item)
        try {
            await updateDoc(docRef, {
                found: !found
            })
            setFound(previous => !previous);
            console.log("Updated item " + Item.item + " found: " + !Item.found)
        } catch (error) {
            console.error('Failed to update item', error)
        }
    }


    async function handleDeleteItem(): Promise<void> {
        try {
            await deleteDoc(doc(firestore, SHOPPINGLIST, Item.item))
            console.log("Deleted item " + Item.item)
        } catch (error) {
            console.error('Failed to remove item', error)
        }
    }


    return (
        <View style={styles.itemView}>
            <View style={styles.textView}>
                <Text
                    style={styles.itemText}
                    numberOfLines={1}
                    ellipsizeMode='tail'>{Item.item}</Text>
            </View>
            <View style={styles.switchView}>
                <Switch
                    trackColor={{ false: '#767577', true: 'blue' }}
                    thumbColor={Item.found ? 'gold' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={Item.found} />
                <Button title='ₓ' onPress={handleDeleteItem} />
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    itemView: {
        flex: 2,
        padding: 4,
        flexDirection: 'row',
        width: '100%'
    },
    textView: {
        width: '75%',
        alignSelf: 'flex-start'
    },
    itemText: {
        fontSize: 24,
        textAlignVertical: 'center',
        alignContent: 'flex-start'
    },
    switchView: {
        width: '25%',
        alignContent: 'flex-end',
        flexDirection: 'row'
    },

})