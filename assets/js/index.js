{
    let post_code = function()
    {
        let new_code  = $('#code');
        new_code.submit(function(e)
        {
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/complier_data',
                data:new_code.serialize(),
                success: function(data)
                {    console.log(data);
                    let newpost = newpostDom(data.data.code);
                  $('#output>ul').prepend(newpost)
                },
                error: function(error)
                {
                    console.log(error);
                }
            })
        })
    }
    let newpostDom = function(output)
    {
        return $(`
                
                <li>
                    <div>
            <table>
                <tr>
                    <th>CPU Time</th>
                    <th>Memory</th>
                </tr>
                <tr>
                    <td>${output.cpuTime}</td>
                    <td>${output.memory}</td>
                </tr>
                <tr>
                    <th colspan="2">Output</th>

                </tr>
                <tr>
                    <td colspan="2">${output.output}</td>
                </tr>
            </table>
        </div>
                    </li>            
            `)
    }
    post_code();
}