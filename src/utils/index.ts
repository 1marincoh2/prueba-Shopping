export const cropText = (texto: string, limitePalabras: number) => {
  const palabras = texto.split(' ')
  if (palabras.length > limitePalabras) {
    return palabras.slice(0, limitePalabras).join(' ') + '...'
  } else {
    return texto
  }
}

export const formatCurrency = (value: any) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export const getIcon = (item: any) => {
  let icon
  switch (item) {
    case 'electronics':
      icon = 'pi pi-camera'
      break
    case 'jewelery':
      icon = 'pi pi-slack'
      break
    case "men's clothing":
      icon = 'pi pi-bookmark-fill'
      break
      case "women's clothing":
        icon = 'pi pi-users'
        break
    default:
      null
      break
  }

  return icon
}

export const getSeverity = (item: any) => {
  let colorTag
  switch (item) {
    case 'electronics':
      colorTag = 'success'
      break

    case 'jewelery':
      colorTag = 'warning'
      break

    case "men's clothing":
      colorTag = 'danger'
      break

    case "women's clothing":
      colorTag = 'info'
      break

    default:
      null
      break
  }

  return colorTag
}
