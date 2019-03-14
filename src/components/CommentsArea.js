import React, {Component} from 'react';
import {ScrollView, TextInput, Text, Image, Button, View} from 'react-native';
import  {Formik} from 'formik';

export default class CommentsArea extends Component {

    state = {
        comments: ['Algo']
    }

    comentar = () => {

    }

    render() {
        return (
            <Formik
                initialValues={{ comment: 'Valor Inicial' }}
                validate={(values) => {
                    const errors = {}
                    if(!values.comment) errors.comment = 'O campo comentário está vazio'
                    return errors
                }}
                onSubmit= {values => {
                    console.warn(values)
                }}
            >
                {
                    (props) => {
                        return(
                            <View>
                                <Text>{JSON.stringify(props.errors)}</Text>
                                <Text>{JSON.stringify(props.touched)}</Text>
                                <TextInput 
                                    onChangeText = {props.handleChange('comment')}
                                    onBlur={props.handleBlur('comment')}
                                    value={props.values.comment}
                                />
                                <Button
                                    title="Enviar Comentário"
                                    onPress={props.handleSubmit}
                                />
                                <Text>{props.errors.comment}</Text>
                                {
                                    this.state.comments.map((comment,indice) => {
                                        return (
                                            <View key={indice}>
                                                <Text>Comentário: {comment}</Text>
                                            </View>
                                        )
                                    })
                                }
                                
                                
                                
                            </View>
                        )
                    }
                }
            </Formik>
            
        )
    }

}