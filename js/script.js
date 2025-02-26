const titleInput = document.getElementById('title');
const memoInput = document.getElementById('memo');
const memoList = document.getElementById('memoList');
let currentEditingItem = null;

function saveMemo() {
    const title = titleInput.value.trim();
    const memo = memoInput.value.trim();
    if (title === "" || memo === "") {
      alert("見出しとメモの内容を入力してください。");
      return;
    }

    const memoItem = document.createElement("div");
    memoItem.dataset.title = title;
    memoItem.dataset.memo = memo;
    memoItem.textContent = title;
    memoItem.addEventListener("click", () => toggleMemoDisplay(memo));

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "編集";

    editButton.addEventListener("click", (event) => {
        event.stopPropagation();
        editMemo(event);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteMemo(event);
    });

    memoItem.addEventListener("mouseover", () => {
        editButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";
    });
    memoItem.addEventListener("mouseout", () => {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
    });

    memoItem.appendChild(editButton);
    memoItem.appendChild(deleteButton);

    if (currentEditingItem) {
        currentEditingItem.classList.remove("editing");
    }

    if (currentEditingItem) {
        memoList.removeChild(currentEditingItem);
        currentEditingItem = null;
    }

    memoList.prepend(memoItem);
    titleInput.value = '';
    memoInput.value = '';
    document.querySelector(".notice").textContent = "";
  }

  function toggleMemoDisplay(memo) {
    const memoDisplay = document.getElementById('memoDisplay');
    if (memoDisplay.textContent === memo) {
      memoDisplay.textContent = " ";
    } else {
      memoDisplay.textContent = memo;
    }

  }

  function clearMemo() {
    memoList.innerHTML = "";
    titleInput.value = "";
    memoInput.value = "";
    document.querySelector(".notice").textContent = "";
    currentEditingItem = null;
  }

  function editMemo(event) {
if (currentEditingItem) {
    currentEditingItem.classList.remove("editing");
}
    currentEditingItem = event.target.parentElement;
    currentEditingItem.classList.add("editing");

    const titleText = currentEditingItem.dataset.title;
    const memoText = currentEditingItem.dataset.memo;
    const memoDisplay = document.getElementById('memoDisplay');
    const noticeSpan = document.querySelector(".notice");

    titleInput.value = titleText;
    memoInput.value = memoText;
    memoDisplay.textContent = ' ';

    noticeSpan.textContent = "編集中";

  }

  function deleteMemo(event) {
    const memoItem = event.target.parentElement;
    if (memoItem === currentEditingItem) {
        currentEditingItem = null;
        titleInput.value = "";
        memoInput.value = "";
        document.querySelector(".notice").textContent = "";
    }
    memoList.removeChild(memoItem);
  }