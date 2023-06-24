import { useSelector, useDispatch } from 'react-redux';
import { getAllSubcollection } from "../../store/action";
import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export function somaSubcolecao(v, colecao, subcolecao, todosVeem, userDados) {
    const dispatch = useDispatch();
    const dadosColecao = useSelector((state) => state.reducer);

    useEffect(() => {
        dispatch(getAllSubcollection(colecao, subcolecao))

    }, [dispatch])

    var soma = 0;

    Object.keys(dadosColecao.subcollection).map((key) => {
        if (
            Array.isArray(dadosColecao.subcollection[key]) &&
            dadosColecao.subcollection[key].length > 0
        ) {
            return dadosColecao.subcollection[key].map((valorprasomar, i) => {
                // Verificar se todosVeem é verdadeiro e se o uid da subcoleção é igual ao uid do usuário
                if (!todosVeem && valorprasomar.uid === userDados.uid) {
                    soma = soma + parseFloat(valorprasomar[v.formnome]);
                } else if (todosVeem) {
                    soma = soma + parseFloat(valorprasomar[v.formnome]);
                }
                return null;
            });
        }
        return null;
    });
    return soma
}


export function userProvider(userr) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const users = snapshot.docs.map((doc) => doc.data());
            // Assuming the user is already authenticated and their UID is available
            const currentUser = users.find((user) => user.uid === userr.uid);

            setUserData(currentUser);
        });

        return () => unsubscribe();
    }, []);
    return userData

};


export function retornaUsuario(uid) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const users = snapshot.docs.map((doc) => doc.data());
            // Assuming the user is already authenticated and their UID is available
            const currentUser = users.find((user) => user.uid === uid);

            setUserData(currentUser);
        });

        return () => unsubscribe();
    }, []);
    return userData

};

export function contarDadosMesmoUID(dadosColecao, userUID, todosVeem) {
    let quantidade = 0;

    if (!todosVeem) {
        dadosColecao.forEach((dado) => {
            if (dado.uid === userUID) {
                quantidade++;
            }
        });
    } else {
        quantidade = dadosColecao.length
    }
    return quantidade || 1; // Verifica se a quantidade é zero e retorna 1 caso seja
}

