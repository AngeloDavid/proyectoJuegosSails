/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    console.log("User create");
    console.log(req.body.email);
    console.log(req.body.fullname);
    console.log(req.body.rol);
    console.log(req.body.password);
    console.log(req.body.confirmPassword);
    if (req.body.password !== req.body.confirmPassword) {
      console.log("1");
      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
    }
    Users.create(req.body).exec(function (err, user) {
      if (err) {
         console.log("2");
        return res.json(err.status, {err: err});
      }
      if (user) {
         console.log("3");
        //console.log(res.json(200, {user: user, token: jwToken.issue({id: user.id})}));
        return res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }

    });
    console.log("fin");
  },

  auth: function (req, res) {
    console.log('Autentificacion');
    var id =req.params.id;
    var claves = id.split("Œ");
    var email = claves[0];
    var password = claves[1]; 


    if (!email || !password) {
      return res.json(401, {err: 'email and password required'});
    }

    Users.findOne({email: email}, function (err, user) {
      if (!user) {
        console.log("sin user");
        return res.json(401, {err: 'invalid email or password'});
      }

      Users.comparePassword(password, user, function (err, valid) {
        if (err) {
          console.log("err");
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          console.log("invalid");
          return res.json(401, {err: 'invalid email or password'});
        } else {
          res.json({
            user: user,
            data:{
              token: jwToken.issue({id : user.id })
            }
            
          });
        }
      });
    })

  },


  signOut:function(req, res) {
    console.log('Secion terminada');

  }

};

