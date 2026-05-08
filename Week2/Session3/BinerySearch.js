let arr = [2, 3, 9, 17, 28, 39, 57, 71, 89, 90, 110, 221, 334],
  arrayLength = arr.length;
let left = 0,
  right = arrayLength - 1,
  mid = 0;
let numberNeedToBeFound = 39,
  result = -1;
while (left <= right) {
  mid = Math.floor(left + (right - left) / 2);
  if (arr[mid] === numberNeedToBeFound) {
    result = mid;
    break;
  }
  if (arr[mid] < numberNeedToBeFound) left = mid + 1;
  else right = mid - 1;
}
if (result != -1) console.log("Index của số cần tìm là :", result);
else console.log("Không tìm thấy số cần tìm trong mảng.");

/*
// Tự đặt câu hỏi: Nếu số cần tìm lặp lại thì sao? (Mở rộng)

let position = 0;
if (result != -1){

    //Quét bên trái
    if (result>0){
        position = result-1;
        if (arr[position] === numberNeedToBeFound)
            while( position >= 0){
                if (arr[position] < numberNeedToBeFound) break;
                console.log(position);
                position--;
            }
    }

    //Quét bên phải
    if (result < arrayLength-1){
        position = result+1;
        if (arr[position] === numberNeedToBeFound)
            while( position < arrayLength){
                if (arr[position] > numberNeedToBeFound) break;
                console.log(position);
                position++;
            }
}

//Tự nhận xét: Cách làm này chỉ phục vụ việc in các index thỏa điều kiện(tức có giá trị = số cần tìm), thứ tự in ra(nếu tồn tại) sẽ là index được tìm theo công thức mid (tạm gọi là indexResult) -> các index có giá trị bằng số cần tìm ở phía bên trái theo thứ tự từ gần đến xa indexResult -> các index có giá trị bằng số cần tìm ở phía bên phải theo thứ tự từ gần đến xa indexResult. Không lưu các vị trí có giá trị trùng lặp này. Nếu có nhu cầu lưu thì có thể dùng mảng, push các index này vào, nếu cần theo thứ tự tăng dần/giảm dần thì sort mảng kết quả đó lại rồi in ra màn hình.
*/
