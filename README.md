# Instagram-API-Simulation
  The purpose of this project is to simulate an API for Instagram. The endpoints of this project are mentioned bellow.

#### Registeration 
  users can register using this address. Each user gives a 64 bits string under "device id" in the header and sends the request. Previously registered users should not be registered again. After registration is user will be given a 128 bit token for authentication.
  The output includes a JSON file including "result" and "user-token".
 <br />
 Example:<br />
    **Input:** localhost/api/reguser/ (headers: device-id: “abcd1234”)<br />
    **Output:** { result: “ok”, user-token:”abcdefgh12345678”}
  <br />
#### Listing Medias
  This address is used for registered users. It includes a list of user's pictures and videos.
  The output is a JSON file including "result" and "media".
  
  Example:<br />
    **Input:** localhost/api/allMedia/ (headers: user-token:”abcdefgh12345678”)<br />
    **Output:** { result: “ok”, media:[ “dl.ingrm.com/mid01”, “dl.ingrm.com/mid02”, “dl.ingrm.com/mid03”] }
    <br />
#### Deleting a media based on ID
  Users can delete a specific media by sending the Mid=[id of media] to the query.
    The output is a JSON file including "result" and "removed".
    
  Example:<br />
    **Input:** localhost/api/remove?mid=”mid02”/ (headers: user-token:”abcdefgh12345678”) <br />
    **Output:** { result: “ok”, removed:1}
