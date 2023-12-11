import { Container } from '@mui/material'
import Appbar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <Appbar />
        <BoardBar />
        <BoardContent />
      </Container>
    </>
  )
}

export default Board
