import React, {useState} from 'react';
import {GlobalStyle} from "./styles/global";
import {Header} from "./components/Header";
import {Dashboard} from "./components/Dashboard";
import Modal from "react-modal";
import {NewTransactionModal} from "./components/NewTransactionModal";
import {TransactionsProvider} from "./hooks/useTransactions";


Modal.setAppElement('#root');

function App() {
    const [isNewTranslationModalOpen, setIsNewTranslationModalOpen] = useState(false);

    function handleOpenNewTranslationModal(){
        setIsNewTranslationModalOpen(true);
    }

    function handleCloseNewTranslationModal(){
        setIsNewTranslationModalOpen(false);
    }
  return (
      <TransactionsProvider>
          <Header onOpenNewTranslationModal={handleOpenNewTranslationModal}/>
          <Dashboard/>
          <NewTransactionModal
              isOpen={isNewTranslationModalOpen}
              onRequestClose={handleCloseNewTranslationModal}
          />
          <GlobalStyle/>
      </TransactionsProvider>
  );
}
export default App;
