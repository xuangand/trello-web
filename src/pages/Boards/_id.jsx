import { useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import Appbar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'

//import { mockData } from '~/apis/mock-data'
import {
  fetchBoardDetailsAPI,
  CreateNewColumnAPI,
  CreateNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //Tạm thời fix cứng boardId, chúng ta sẽ sử dụng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '65b34d0fa73366420f8510ab'
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      //Sắp xếp thứ tự column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con. (video 71)
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

      board.columns.forEach(column => {
        //Khi f5 trang web cần xử lý vấn đề kéo thả vào một column rỗng
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        }
        else {
          //Sắp xếp thứ tự cards luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con. (video 71)
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  //Func này có nhiệm vụ gọi API tạo mới column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await CreateNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    //Khi tạo xong một column mới thì cần xử lý vấn đề kéo thả column rỗng
    createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]

    //Cập nhật lại state Board
    //Phía front-end phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDataAPI)
    //Lưu ý: Cách làm này phụ thuộc vào tùy lựa chọn và đặc thù của dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là API tạo column hay card đi chăng nữa => lúc này FE sẽ nhàn hơn.
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  //Func này có nhiệm vụ gọi API tạo mới card và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await CreateNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    //Cập nhật lại state Board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  //Func này có nhiệm vụ gọi API và xử lý sau khi kéo thả column xong xuôi
  const moveColumn = (dndOrderedColumns) => {
    //Update lại cho chuẩn dữ liệu state Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //Gọi API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  /**
   * Khi di chuyển card trong cùng một column:
   * Chỉ cần gọi API để cập nhật mảng cardOrderIds của column chứa nó (thay đổi vị trí trong mảng)
   */
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //Update cho chuẩn dữ liệu State Board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    //Gọi API đẻ update card
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <Appbar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumn={moveColumn}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
        />
      </Container>
    </>
  )
}

export default Board
