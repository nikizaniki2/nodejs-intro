export const Posts = {
  "data": {
    "count": 20,
    "next": "http://server.domain.net/restapi/post/?page=2",
    "previous": null,
    "results": [
      {
        "id": 25,
        "title": "TEST POST",
        "content": "New Post 2",
        "author": {
          "id": 2,
          "username": "tester"
        }
      },
      {
        "id": 24,
        "title": "New User",
        "content": "New Post",
        "author": {
          "id": 2,
          "username": "tester"
        }
      },
      {
        "id": 23,
        "title": "Components",
        "content": "Components are now separated",
        "author": {
          "id": 1,
          "username": "nikola-sekulov"
        }
      },
      {
        "id": 22,
        "title": "Hello",
        "content": "asdd",
        "author": {
          "id": 1,
          "username": "nikola-sekulov"
        }
      },
      {
        "id": 20,
        "title": "A new post",
        "content": "sadasd",
        "author": {
          "id": 1,
          "username": "nikola-sekulov"
        }
      }
    ]
  },
  "status": 200,
  "statusText": "OK",
  "headers": {
    "content-length": "576",
    "content-type": "application/json"
  },
  "config": {
    "url": "http://server.domain.net/restapi/post/",
    "method": "get",
    "headers": {
      "X-CSRFToken": "ddfh6sAs2SNi2ZnDtenK1R8pEJAHNiePnrCbKmntFAZi9kEF8xF3PcMh9ECaKB9c",
      "Accept": "application/json"
    },
    "transformRequest": [
      null
    ],
    "transformResponse": [
      null
    ],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "withCredentials": true
  },
  "request": {}
};