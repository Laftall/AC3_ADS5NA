import { router } from 'expo-router'

import { useState } from 'react'

import {
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

import { addExpense } from '../home/home'

import { styles } from './style'

export const Details = () => {
  const [description, setDescription] =
    useState('')

  const [value, setValue] = useState('')

  const [error, setError] = useState('')

  const handleValueChange = (text: string) => {
    /*
      Remove caracteres inválidos
    */

    let formatted = text.replace(/[^0-9,]/g, '')

    /*
      Permite apenas UMA vírgula
    */

    const parts = formatted.split(',')

    if (parts.length > 2) {
      formatted =
        parts[0] + ',' + parts[1]
    }

    setValue(formatted)
  }

  const handleSave = () => {
    if (!description.trim()) {
      setError('Digite uma descrição')
      return
    }

    if (!value.trim()) {
      setError('Digite um valor')
      return
    }

    /*
      Converte vírgula para ponto
    */

    const formattedValue = Number(
      value.replace(',', '.')
    )

    if (formattedValue <= 0 || isNaN(formattedValue)) {
      setError('Digite um valor válido')
      return
    }

    setError('')

    addExpense({
      id: String(Date.now()),
      description: description.trim(),
      value: formattedValue
    })

    router.back()
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Valor"
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={handleValueChange}
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  )
}