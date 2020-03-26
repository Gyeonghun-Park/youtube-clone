import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const addCommentBtn = document.getElementById("jsAddCommentBtn");
const deleteCommentBtn = document.getElementById("jsDeleteCommentBtn");
// const commentList = document.getElementById("jsCommentList");
// const commentNumber = document.getElementById("jsCommentNumber");
// const comments = document.getElementById("jsComments");
const commentId = document.getElementById("jsCommentId");

// const increaseNumber = () => {
//   const commentNum = parseInt(commentNumber.innerHTML, 10);
//   if (commentNum === 0) {
//     comments.innerHTML = "comment";
//   } else {
//     comments.innerHTML = "comments";
//   }
//   commentNumber.innerHTML = commentNum + 1;
// };

// const addComment = comment => {
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   span.innerHTML = comment;
//   li.appendChild(span);
//   commentList.prepend(li);
//   increaseNumber();
// };

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    location.reload(true);
    //addComment(comment);
  }
};

const deleteComment = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  const id = commentId.innerHTML;
  await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      id
    }
  });
  location.reload(true);
};

const handleSubmit = (/*evnet*/) => {
  //event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  addCommentBtn.addEventListener("click", handleSubmit);
  deleteCommentBtn.addEventListener("click", deleteComment);
}

if (addCommentForm) {
  init();
}
