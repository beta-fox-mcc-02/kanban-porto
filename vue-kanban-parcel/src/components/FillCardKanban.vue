<template>
  <div>
        <li>
            <div class="card-body">
                <h4 class="card-title">{{task.title}}</h4>
                <p class="card-text">{{task.description}}</p>
                <a href="#" class="btn btn-primary">EDIT</a>
                <a href="#" class="btn btn-danger">DELETE</a>
            </div>

        </li>
</div>
</template>

<script>

export default {
    name: "FillCardKanban",
    props: {
        task: Object
    }
}
</script>

<style>

</style>