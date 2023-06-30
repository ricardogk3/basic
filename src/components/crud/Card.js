import React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { useSelector, useDispatch } from 'react-redux';
import { deleteDadoColecao, deleteSubcollection, getAllSubcollection } from "../../store/action";
import ReadSubColection from './ReadSubColection';
import './style.css'
import { RetornaUsuario } from '../crud/funcoes'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: 0.1,
    }),
}));

export default function RecipeReviewCard(b) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const dadosColecao = useSelector((state) => state.reducer);

    useEffect(() => {
        if (!!b.subcolecao) {
            if (!!b.colecao && !!b.subcolecao.colecaoFirebase) {

                dispatch(getAllSubcollection(b.colecao, b.subcolecao.colecaoFirebase))
            }
        }
    }, [dispatch])


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <div>
            <div className="card">
                <div style={{ display: "flex", width: '100%' }}>
                    {!!b.subcolecao ? <div style={{ paddingLeft: 'initial' }}>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <div style={{ position: 'relative', zIndex: -1 }}>
                                <ExpandMoreIcon />
                            </div>
                        </ExpandMore>
                    </div>
                        : <></>}
                    {b.parametros.mostrarQuemCriou ?
                        <div style={{ flex: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                            <p className='pCardMostrarQuemCriou'>
                                {RetornaUsuario(b.dadoColecao.uid)?.name + " " + RetornaUsuario(b.dadoColecao.uid)?.lastname}
                            </p>
                        </div>
                        : <></>}
                    {b.parametros.input.map((v, i) => {
                        if (v.tipo === 'subsoma') {
                            var soma = 0;
                            if (Array.isArray(dadosColecao.subcollection[b.dadoColecao.id]) && dadosColecao.subcollection[b.dadoColecao.id].length > 0) {
                                dadosColecao.subcollection[b.dadoColecao.id].map((valorprasomar, i) => {
                                    soma = soma + parseFloat(valorprasomar[v.formnome])
                                    return null;
                                })
                            }
                            return (
                                <div className='pCardDiv' key={i}>
                                    <p>{soma}</p>
                                </div>
                            )
                        } else if (v.tipo === 'date') {
                            var dataString = '0000-00-00'
                            if (typeof (dataString) === 'string') {
                                dataString = b.dadoColecao[v.titulo];
                            } else (
                                dataString = '0000-00-00'
                            )
                            const [ano, mes, dia] = dataString.split("-");
                            return (
                                <div className='pCardDiv' key={i}>
                                    <p>{dia + "/" + mes + "/" + ano}</p>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className='pCardDiv' key={i}>
                                    <p className='pCard'>{b.dadoColecao[v.titulo]}</p>
                                </div>

                            )
                        }
                    }
                    )}
                    <div className='funcoesdeeditaredeletar'>

                        {b.editFormVisibility === false && (
                            <>
                                <span className='edit' onClick={() => {
                                    b.editfunction(b.dadoColecao)
                                }}>
                                    <Icon icon={edit2} size={20} />
                                </span>
                                <span className='trash' onClick={() => {
                                    if (b.sub) {
                                        dispatch(deleteSubcollection(b.colecaoOriginal, b.dadoColecao.originalId, b.subcolecaoName, b.dadoColecao.id))
                                    } else {
                                        dispatch(deleteDadoColecao(b.colecao, b.dadoColecao.id))
                                    }
                                }}>
                                    <Icon icon={trash} size={20} />
                                </span>
                            </>
                        )}

                    </div>
                </div>

            </div>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                sx={{ background: '#fff', borderLeft: " 2px solid #ddd", borderRight: " 2px solid #ddd", borderBottom: " 2px solid #ddd" }}>
                <ReadSubColection
                    parametros={b.subcolecao}
                    colecaoOriginal={b.colecao}
                    dados={b.dadoColecao.id}
                />
            </Collapse>
        </div>
    );
}