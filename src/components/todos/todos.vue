<template>
  <div class="container">
    <div class="todo_item">
      <h2 class="my-4">All Todos</h2>
      <div class="row">
        <div class="col-sm-5">
          <form @submit.prevent="addtodo">
            <div class="form-group">
              <input
                type="text"
                class="form-control simplebox"
                id="addtodo"
                aria-describedby="addtodo"
                placeholder="Add todo item and press Enter"
                v-model="newTodo"
              >
              <span v-if="msg" class="notify">{{msg}}</span>
            </div>
          </form>
          <transition-group
            enter-active-class="animated fadeInUp"
            leave-active-class="aimated fadeOutDown"
          >
            <div v-for="todo in todosFiltred" :key="todo.id" class="todo-items">
              <div class="todo" :class="{doneCompleted : todo.completed}">
                <div class="pl-3">
                  <input class="form-check-input" type="checkbox" v-model="todo.completed">
                </div>
                <div>
                  <div
                    class="check"
                    :class="{completed : todo.completed}"
                    v-if="!todo.editing"
                    @dblclick="editTodo(todo)"
                  >{{todo.title}}</div>

                  <input
                    v-else
                    type="text"
                    @keyup.enter="dontEdit(todo)"
                    @blur="dontEdit(todo)"
                    @keyup.esc="cancelEdit(todo)"
                    class="form-control simplebox-edit"
                    v-model="todo.title"
                    v-focus
                  >
                </div>
                <div @click="removeTodo(todo.id)" class="close">
                  <i class="el-icon-circle-close-outline"></i>
                </div>
              </div>
            </div>
          </transition-group>
          <div class="filters text-muted">
            <div class="counter mr-3">
              <span class="todocount">{{remaining}}</span> items left
            </div>
            <div class="all">
              <button :class="{ active: filter =='all' }" @click="filter = 'all'">All</button>
            </div>
            <div class="myactive mx-3">
              <button :class="{ active: filter =='active'}" @click="filter = 'active'">Active</button>
            </div>
            <div class="completed_item">
              <button
                :class="{ active: filter =='completed'}"
                @click="filter = 'completed'"
              >Completed</button>
            </div>
          </div>
          <!-- <div class="progress">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              style="width: 25%"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: "all",
      beforeEditCache: "",
      msg: "",
      idForTodo: 3,
      newTodo: "",
      todos: [
        {
          id: 1,
          title: "Finish To Do Component",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "To Met A new Girl Today",
          completed: false,
          editing: false
        }
      ]
    };
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    notallchecked() {
      return this.remaining != 0;
    },
    todosFiltred() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    addtodo() {
      if (!this.newTodo || this.newTodo.length < 3) {
        this.msg += "Minimun character is three";

        return false;
      } else {
        this.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          completed: false,
          editing: false
        });
      }
      this.newTodo = "";
      this.msg = "";
      this.idForTodo++;
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    dontEdit(todo) {
      if (todo.title.length <= 3) {
        todo.title = this.beforeEditCache;
        this.msg += "Minimun character is three";
      } else {
        this.msg = "";
      }

      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    checkAllTodos() {
      this.todos.forEach(todo => (todo.completed = this.event.target.checked));
    }
  }
};
</script>

<style scoped>
input,
input:focus {
  font-size: 90%;
  outline: 0;
  background-color: #ecf0f1;
  border: 1px solid #ecf0f1;
  margin-bottom: 8px;
}

.simplebox {
  outline: 0;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}
.simplebox-edit {
}
.todo {
  justify-content: space-between;
  display: flex;
  padding: 8px;
  background-color: #fff;
  margin: 5px 0;
  border-radius: 4px;
  border-left: 5px solid #41b883;
}

.todo-items {
  animation-duration: 0.2s;
}
.notify {
  font-size: 80%;
  color: crimson;
  position: absolute;
  top: 38px;
}
i {
  font-size: 140%;
}
.el-icon-circle-close-outline {
  color: crimson;
}
.check {
  margin-right: 170px;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.doneCompleted {
  border-left: 8px solid #b84147;
}
.filters {
  font-size: 90%;
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: white;
  border: 1px solid #b8b6b6;
  border-radius: 6px;
}
.counter {
  font-size: 80%;
}
button {
  font-size: 70%;
  border: 1px;
  padding: 3px;
  border-radius: 5px;
}
.active {
  background-color: rgb(65, 184, 131);
}
</style>
