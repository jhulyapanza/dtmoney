import {createContext, useEffect, useState, ReactNode, useContext} from 'react';
import {api} from "../services/api";

interface Transaction{
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt: string,
}

interface TransactionInput{
    title: string,
    type: string,
    amount: number,
    category: string,
}

interface TransactionsProviderProps{
    children: ReactNode; //aceita qualquer conteúdo valido do react
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransactions: (transaction: TransactionInput) => Promise<void>;
}

export const UseTransactions = createContext<TransactionsContextData>(
    {} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() =>{
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions));
    },[]);

    async function createTransactions(transactionsInput: TransactionInput){
         const response = await api.post("/transactions", {
             ...transactionsInput,
             createdAt: new Date(),
         })
         const {transaction} = response.data;

         setTransactions([
             ...transactions,
             transaction,
         ]);
    }

    return (
        <UseTransactions.Provider value={{transactions, createTransactions}}>
            {children}
        </UseTransactions.Provider>
    );
}

export function useTransactions() {
    const context = useContext(UseTransactions);

    return context;
}