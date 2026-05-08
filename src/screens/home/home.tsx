import { router, useFocusEffect } from 'expo-router'

import { useCallback, useState } from 'react'

import {
    FlatList,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { styles } from './style'

export interface IExpense {
  id: string
  description: string
  value: number
}

/*
  LISTA GLOBAL
  fica fora do componente
*/

export const expensesList: IExpense[] = []

export const addExpense = (expense: IExpense) => {
  expensesList.push(expense)
}

export const removeExpense = (id: string) => {
  const index = expensesList.findIndex(
    item => item.id === id
  )

  if (index !== -1) {
    expensesList.splice(index, 1)
  }
}

export const Home = () => {
  const [expenses, setExpenses] =
    useState<IExpense[]>([])

  /*
    Atualiza sempre que voltar pra tela
  */

  const loadExpenses = () => {
    setExpenses([...expensesList])
  }

  useFocusEffect(
    useCallback(() => {
      loadExpenses()
    }, [])
  )

  const total = expenses.reduce(
    (acc, item) => acc + item.value,
    0
  )

  const handleDelete = (id: string) => {
    removeExpense(id)

    loadExpenses()
  }

  const renderItem = ({
    item
  }: {
    item: IExpense
  }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>
          {item.description}
        </Text>

        <Text style={styles.value}>
          R$ {item.value.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.total}>
        Total: R$ {total
            .toFixed(2)
            .replace('.', ',')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.navigate('/details')
        }
      >
        <Text style={styles.buttonText}>
          Novo gasto
        </Text>
      </TouchableOpacity>

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum gasto cadastrado
          </Text>
        }
      />
    </View>
  )
}