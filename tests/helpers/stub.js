var stubEndpointForHttpRequest = function(url, json, verb, status) {
    $.fauxjax.new({
        type: verb || "GET",
        url: url,
        status: status || 200,
        dataType: 'json',
        responseText: json
    });
};

export default stubEndpointForHttpRequest;
