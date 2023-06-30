import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSubcollection } from "../../store/action";

const SomaSubcolecao = (v, colecao, subcolecao, todosVeem, userDados) => {
  const dispatch = useDispatch();
  const dadosColecao = useSelector((state) => state.reducer);

  useEffect(() => {
    dispatch(getAllSubcollection(colecao, subcolecao));
  }, [dispatch, colecao, subcolecao]);

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

  return soma;
}

export default SomaSubcolecao;
