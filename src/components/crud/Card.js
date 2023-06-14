import * as React from 'react';
import {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, deleteSubcollection, getAllSubcollection } from "../../store/action";
import ReadSubColection from './ReadSubColection'
import { getSubcollection } from "../../store/action";
import './style.css'

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
    const [expanded, setExpanded] = React.useState(false);

    const dispatch = useDispatch();
    const books = useSelector((state) => state.reducer.subcollection);
    
    // console.log(books)
    useEffect(() => {
        if(!!b.colecao && !!b.subcolecao.colecaoFirebase){

            dispatch(getAllSubcollection(b.colecao, b.subcolecao.colecaoFirebase))
        }
        // dispatch(getSubcollection(p.colecaoOriginal, p.parametros.colecaoFirebase, p.dados))
        // const fetchData = async () => {
        //     const result = await dispatch(getSubcollection(p.colecaoOriginal, p.parametros.colecaoFirebase, p.dados));
        //     if (result) {
        //         setLoading(false)
        //     }
        // };
        // fetchData();
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
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </div>
                        : <></>}
                    {b.inputs.map((v, i) => (
                        <div style={{ flex: 4, display: 'flex', flexDirection: "row", justifyContent: 'center' }} key={i}>
                            <p>{b.book[v.titulo]}</p>
                        </div>
                    )
                    )}
                    <div className='funcoesdeeditaredeletar'>

                        {b.editFormVisibility === false && (
                            <>
                                <span className='edit' onClick={() => {
                                    b.editfunction(b.book)
                                }}>
                                    <Icon icon={edit2} size={20} />
                                </span>
                                <span className='trash' onClick={() => {
                                    if(b.sub){
                                        dispatch(deleteSubcollection(b.colecaoOriginal, b.book.originalId, b.subcolecaoName, b.book.id ))
                                    }else{
                                        dispatch(deleteBook(b.colecao, b.book.id))
                                    }
                                }}>
                                    <Icon icon={trash} size={20} />
                                </span>
                            </>
                        )}

                    </div>
                </div>

            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{background:'#fff', borderLeft:" 2px solid #ddd", borderRight:" 2px solid #ddd", borderBottom:" 2px solid #ddd"}}>
                <ReadSubColection
                    parametros={b.subcolecao}
                    colecaoOriginal={b.colecao}
                    dados={b.book.id}
                />
            </Collapse>
        </div>
    );
}