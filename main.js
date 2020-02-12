const temporaryTask1 = [
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `high priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `high priority`
}]
const temporaryTask2 = [
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `high priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `low priority`
},
{
    title: `ini adalah title dari task`,
    tag: `high priority`
}]
const categories = [
    {name: "Backlog", data: temporaryTask1}, {name: 'Product', data: temporaryTask2}, {name: 'Development', data: temporaryTask1}, {name: 'Done', data: temporaryTask1}]

new Vue({
    el: "#app",
    data: {
        currentPage: 'register',
        categories
    }
})