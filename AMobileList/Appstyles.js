import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
        backgroundColor: 'rgb(55 65 81)',
        minHeight: '100%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgb(152, 1, 14)'
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '2%',
        borderRadius: '50%',
        padding: 10,
        ...Platform.select({
            android: {
                backgroundColor: '#c9b4ee'
            },
            ios: {
                backgroundColor: 'rgb(152, 1, 14)'
            },
            default: {
                backgroundColor: '#b4bded'
            }
        })
    },
    loading: {
        marginTop: '50%'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    button: {
        padding: 10,
        borderRadius: '50%',
        backgroundColor: '#fff',
        marginTop: '2%'
    }
})

export default styles