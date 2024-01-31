import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Appbar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

//import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, CreateNewColumnAPI, CreateNewCardAPI } from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //Tạm thời fix cứng boardId, chúng ta sẽ sử dụng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '65b34d0fa73366420f8510ab'
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      //Khi f5 trang web cần xử lý vấn đề kéo thả vào một column rỗng
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
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

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <Appbar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
      </Container>
    </>
  )
}

export default Board
