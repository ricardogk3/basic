import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { useDispatch } from 'react-redux';
import { deleteBook, deleteSubcollection } from "../../store/action";
import ReadSubColection from './ReadSubColection'

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card style={{ background: '#aaa', marginBottom: 4, marginTop: 4 }}>
            <div>
                <div style={{ display: "flex", width: '100%' }}>
                    {b.inputs.map((v, i) => (
                        <div style={{ flex: 1, display: 'flex', flexDirection: "row", justifyContent: 'center' }} key={i}>
                            {i == 0 && !!b.subcolecao ? <div style={{ paddingLeft: 'initial' }}>
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
                            <p>{b.book[v.titulo]}</p>
                        </div>
                    )
                    )}
                    <div className='actions'>

                        {b.editFormVisibility === false && (
                            <>
                                <span className='edit' onClick={() => {
                                    b.editfunction(b.book)
                                }}>
                                    <Icon icon={edit2} size={24} />
                                </span>
                                <span className='trash' onClick={() => {
                                    if(b.sub){
                                        dispatch(deleteSubcollection(b.colecaoOriginal, b.book.originalId, b.subcolecaoName, b.book.id ))
                                    }else{
                                        dispatch(deleteBook(b.colecao, b.book.id))
                                    }
                                }}>
                                    <Icon icon={trash} size={24} />
                                </span>
                            </>
                        )}

                    </div>
                </div>

            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ReadSubColection
                    parametros={b.subcolecao}
                    colecaoOriginal={b.colecao}
                    dados={b.book.id}
                />
            </Collapse>
        </Card>
    );
}