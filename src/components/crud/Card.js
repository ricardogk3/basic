import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { useDispatch } from 'react-redux';
import { deleteBook } from "../../store/action";
import Read from './Read';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard(b) {
    const [expanded, setExpanded] = React.useState(false);

    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // console.log(b.book[b.subcolecao.colecaoFirebase])

    return (
        <Card style={{ background: '#aaa', marginBottom: 4, marginTop: 4 }}>
            <div>
                <div style={{ display: "flex", width: '100%' }}>
                    {b.inputs.map((v, i) => (
                        <div style={{ flex: 1, display: 'flex', flexDirection: "row", justifyContent: 'center' }} key={i}>
                            {i == 0 && !!b.subcolecao ? <div style={{ paddingLeft: 'initial' }}>
                                {/* <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore> */}
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
                                    // setAddoredit(true)
                                    // b.handleEdit(b.book)
                                    b.editfunction(b.book)
                                }}>
                                    <Icon icon={edit2} size={24} />
                                </span>
                                <span className='trash' onClick={() => dispatch(deleteBook(b.book.id))}>
                                    <Icon icon={trash} size={24} />
                                </span>
                            </>
                        )}

                    </div>
                </div>

            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* <Typography paragraph>Method:</Typography> */}
                    {/* <Read
                        parametros={b.subcolecao}
                        dados={b.book[b.subcolecao.colecaoFirebase]}
                    /> */}
                </CardContent>
            </Collapse>
        </Card>
    );
}