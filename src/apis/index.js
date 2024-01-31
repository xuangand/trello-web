import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

//Lưu ý, đối với việc sử dụng axios, tất cả các function bên dưới ta chỉ request và là data từ response luôn, mà không có try catch hay then catch gì để bắt lỗi.
//Lý do là vì ở phía front-end chúng ta không cần thiết làm như vậy với mỗi request vì nó sẽ gây ra việc dư thừa code catch lỗi quá nhiều.
//Giải pháp clean code gọn gàng đó là chúng ta sẽ catch lỗi tập trung tại một noi bằng cách tận dụng một thứ cực kì mạnh mẽ trong axios là Interceptors.
//Hiểu đơn giản Interceptors là cách mà chúng ta sẽ đánh chặn vào giữa request hoặc response để xử lý logic mà chúng ta muốn.

//Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //Lưu ý: axios sẽ trả kết quả về qua property của nó là data
  return response.data
}

//Columns
export const CreateNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

//Cards
export const CreateNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
