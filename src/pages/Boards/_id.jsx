import { Container } from '@mui/material'
import Appbar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

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
