<template>
  <div class="container">
    <h2 class="my-4">All notes</h2>
    <div v-for="note in notes" :key="note.id" class="note_wrapper">
      <div class="dates_wrapper">
        <div class="created_on">created on</div>
        <div class="note_date">
          <span class="day">{{note.day}}</span>
          <span class="month">{{note.month}}</span>
        </div>
      </div>
      <div class="note_text">{{note.content}}</div>
    </div>
  </div>
</template>
<script>
import fb from "@/components/firebaseConfig";
export default {
  name: "notes",
  data() {
    return {
      notes: []
    };
  },

  methods: {},
  created() {
    fb.notesCollection.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let timestamp = doc.data().created_on;
        let myDate = new Date(timestamp.seconds * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        const query = {
          id: doc.id,
          content: doc.data().content,
          day: myDate.getDate(),
          month: months[myDate.getMonth()]
        };

        this.notes.push(query);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.note_wrapper {
  font-size: 110%;
  margin: 8px 0;

  display: grid;
  grid-template-columns: 10% auto;
  border-radius: 10px;
}
.note_date {
  border-bottom-left-radius: 10px;
  background-color: #95a5a6;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span.day {
    font-size: 180%;
  }
}

.note_text {
  background-color: #fff;
  padding: 12px;
  line-height: 28px;
  letter-spacing: 1px;
  margin-left: 8px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.created_on {
  border-top-left-radius: 10px;
  text-align: center;
  font-size: 70%;
  font-weight: 100;
  padding: 1px 0;
  background-color: #16a085;
  color: #fff;
}
</style>
