import logoImg from '../../assets/logo.svg';
import Modal from 'react-modal';
import {Container, Content} from './styles';
import {useState} from "react";

interface HeaderProps{
    onOpenNewTranslationModal: () => void;

}

export function Header({onOpenNewTranslationModal}: HeaderProps){
    return(
        <Container>
            <Content>
                <img src={logoImg} alt="dt money"/>
                <button type="button" onClick={onOpenNewTranslationModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}