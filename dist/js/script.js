let tasksArr = [
  {
    _id: 'b11pah9uscs2rjekz',
    completed: true,
    title: 'Lorem ipsum dolor sit.',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat cumque dignissimos inventore harum quibusdam.',
  },
  {
    _id: 'ehfijb6bxoktof7i7',
    completed: true,
    title: 'Lorem ipsum dolor.',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora veniam id sit officia quaerat autem omnis, deleniti et quis!',
  },
  {
    _id: 'dbt6cns9jb7y45gfn',
    completed: true,
    title: 'dolor sit.',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quasi?',
  },
];

;(function creatingTask(tasks) {
  //transform tasks array in tasks object for simply work
  let taskObj = transformArrInObj(tasks);

  //select DOM elements
  const list = document.querySelector('#list'),
        form = document.forms['tasks'],
        titleArea = form.elements['title'],
        textArea = form.elements['text'];

  addAllTasks(taskObj);

  //events
  form.addEventListener('submit', onFormSubmit);
  list.addEventListener('click', deleteItem);

  function transformArrInObj(arr) {
    return arr.reduce((acc, e) => {
      acc[e._id] = e;
      return acc;
      }, {});
  };

  function addAllTasks(tasks) {
    if(!tasks) {
      console.error('Pass Task-List');
      return;
    }

    let values = Object.values(tasks);
    let fragment = document.createDocumentFragment();

    values.forEach(e => fragment.appendChild(createElements(e)));

    list.appendChild(fragment);
  }

  function createElements({_id ,title, body}) {
    let item = document.createElement('li');
    item.classList.add('item');
    item.dataset.id = _id;

    let h3 = document.createElement('h3');
    h3.classList.add('item__title');
    h3.textContent = title;

    let article = document.createElement('p');
    article.classList.add('item__text');
    article.textContent = body;

    let btn = document.createElement('button');
    btn.classList.add('item__delete');
    btn.textContent = 'Delete task';

    item.appendChild(h3);
    item.appendChild(article);
    item.appendChild(btn);

    return item;
  };

  function onFormSubmit(e) {
    e.preventDefault();

    let title = titleArea.value;
    let body = textArea.value;

    if(!title || !body) {
      alert('Write task');
      return;
    }

    let task = addNewTask(title, body);
    let li = createElements(task);

    list.insertAdjacentElement('afterbegin', li);
    form.reset();
  };

  function addNewTask(title, body) {
    const task = {
      _id: generateRandomId(),
      complited: false,
      title,
      body,
    };

    taskObj[task._id] = task;

    return task;
  };

  function deleteItem({target}) {
    if(target.type === 'submit') {
      confirmDelte(target.parentElement);
    }
  }

  function confirmDelte(parent) {
    let _id = parent.dataset.id;

    let isConfirm = confirm(`You shure to delete? ${taskObj[_id].title}`);

    if(!isConfirm) return;

    delete taskObj[_id];
    parent.remove();
  }

  function generateRandomId() {
    let str = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    let res = '';

    for(let i = 0; i <= 16; i++) {
      let random = (Math.random() * str.length).toFixed(0);
      res += str[random];
    };
    
    return res;
  };
})(tasksArr);