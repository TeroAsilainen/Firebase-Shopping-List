import { View, Text, StyleSheet, Switch } from 'react-native'
import React, { useState } from 'react'
import { ShoppingItem } from '../types/ShoppingItem'

export default function ItemRow(Item: ShoppingItem) {
    const [found, setFound] = useState<boolean>(Item.found)
    const toggleSwitch = () => setFound(previousState => !previousState);

    return (
        <View style={styles.itemView}>
            <Text style={styles.itemText}>{Item.item}</Text>
            <Switch
                trackColor={{ false: '#767577', true: 'blue' }}
                thumbColor={found ? 'gold' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={found} />

        </View>
    )
}

const styles = StyleSheet.create({
    itemView: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    itemText: {
        fontSize: 24,
        textAlignVertical: 'center'
    }
})