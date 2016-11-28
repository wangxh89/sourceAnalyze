import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

export default commstyles = StyleSheet.create({
    txt_title: {
        fontSize: 18,
        color:'#4c4c4c'
    },
    row_title_font: {
        fontSize:14,
        color:'#909090'
    },
    row_content_font: {
        fontSize:14,
        color:'#4c4c4c'
    },
    row_place_text: {
        flex:1,
        fontSize:14,
        color:'#4c4c4c',
    },
    table_row: {
        height:35,
    },
    table_arrow_row_content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    view_button_normal: {
        backgroundColor:'#32bff4',
        height:35,
        borderRadius:2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title_button_normal: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    view_button_gray: {
        backgroundColor:'#F1F1F1',
        height:35,
        borderRadius:2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3',        
    },
    title_button_gray: {
        color: '#4c4c4c',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switch_button: {
        
    },
    nav_button_item: {
        marginLeft: 7,
    },
    common_row_title: {
        color: '#4c4c4c',
        fontSize: 14
    },
    justAlign: {
        alignItems: 'center', 
        justifyContent: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});