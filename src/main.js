$(document).ready(() => {
  findAll()
    .then(res => {
      $('#table tbody').empty();
      res.data.data.forEach(el => {
        $('#table tbody').append(`
        <tr>
          <th scope="row">${el.id}</th>
          <td>${el.name}</td>
          <td>${el.email}</td>
        </tr>
        `)
      })
    })
})