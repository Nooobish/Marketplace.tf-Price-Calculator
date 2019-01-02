// ==UserScript==
// @name         Marketplace.tf Calculator
// @namespace    https://github.com/Nooobish/Marketplace.tf-Price-Calculator
// @version      0.1
// @description  try to take over the world!
// @author       You. Who me?
// @match        https://marketplace.tf/*
// @match        http://marketplace.tf/*
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==
(function() {

        'use strict';

        if (window.location.pathname == "/dashboard") {
            let css_calculator = '<style>.dollar{display:inline-block;position:absolute;margin-top:9px;margin-left:7px;font-size:13px}input[type="number"]{padding-left:14px}#output{font-weight:700}#output p{display:unset}</stlye>';
            let html_calculator = '<div class="panel panel-info"> <div class="panel-heading"> Price calculator </div> <div class="panel-body"> <div class="row"> <div class="col-sm-3 col-sm-offset-3 text-center"> <div class="dashboard-info-header" style="margin: 0 !important"> <div class="header-decoration"></div> Key in $ <div class="header-decoration"></div> </div> <input type="number" class="form-control input-sm" id="key_dollar"> <button type="button" class="btn btn-primary btn-sm" id="key_dollar_save">Save</button> </div> <div class="col-sm-3 text-center"> <div class="dashboard-info-header" style="margin:0 !important"> <div class="header-decoration"></div> Key in ref <div class="header-decoration"></div> </div> <input type="number" class="form-control input-sm" id="key_ref"> <button type="button" class="btn btn-primary btn-sm" id="key_ref_save">Save</button> </div> </div> <table class="table table-bordered"> <tbody> <tr> <td>How many keys could I get for this price:</td> <td> <div class="dollar">$</div> <input id="input_1" type="number" value="0" step="0.01" class="form-control input-sm"> </td> <td> <div> <button class="btn btn-primary btn-sm" id="f_input_1">Calculate</button> </div> </td> </tr> <tr> <td>I want to buy X keys:</td> <td> <input id="input_2" type="number" step="1" value="0" class="form-control input-sm"> </td> <td> <div> <button class="btn btn-primary btn-sm" id="f_input_2">Calculate</button> </div> </td> </tr> <tr> <td>How many keys could I get if I sell item for:</td> <td> <input id="input_3" type="number" step="1" value="0" class="form-control input-sm"> </td> <td> <div> <button class="btn btn-primary btn-sm" id="f_input_3">Calculate</button> </div> </td> </tr> <tr> <td>How much cost item if I bough it for (keys):</td> <td> <input id="input_4" type="number" step="1" value="0" class="form-control input-sm"> </td> <td> <div> <button class="btn btn-primary btn-sm" id="f_input_4">Calculate</button> </div> </td> </tr> </tbody> </table> <div id="output"></div> </div></div>';
            $("head").append(css_calculator);
            $($(".panel-info.dashboard-panel")[0]).parent().parent().prepend(html_calculator);

            $("#key_dollar_save").click (f_key_dollar_save);
            $("#key_ref_save").click (f_key_ref_save);
            $("#f_input_1").click (f_input_1);
            $("#f_input_2").click (f_input_2);
            $("#f_input_3").click (f_input_3);
            $("#f_input_4").click (f_input_4);
            sync();
            };


        async function sync() {
          try {
            document.getElementById('key_dollar').value = await GM.getValue('key_dollar');
            document.getElementById('key_ref').value = await GM.getValue('key_ref');
          }
          catch(err) {
            $("#output").html('<h4 class="text-danger">Uhhh, ohhh.... Something went wrong. If you don\'t know what caused this error, then please <a href="" targer="_blank">report bug</a>.</h4><br>Error code: ' + err.message);
          }

        }

        async function f_key_dollar_save() {
          if (document.getElementById('key_dollar').value == 0) {
            $("#output").html("<h4 class='text-danger'>Key can't be equal to 0 USD. Please try oher number.</h4>", 3000)
          }
          else {
            var key_dollar = await GM.getValue('key_dollar', 0);
            // Note awaiting the set -- required so the next get sees this set.
            await GM.setValue('key_dollar', document.getElementById('key_dollar').value);
            // Get the value again, just to demonstrate order-of-operations.
            $("#output").html("<h4 class='text-success'>Success, Mann Co. Supply Crate Key is equal to " + await GM.getValue('key_dollar', 0) + " $.</h4>")
          };
        };

        async function f_key_ref_save(){
          if (document.getElementById('key_ref').value == 0) {
            $("#output").html("<h4 class='text-danger'>Key can't be equal to 0 Refind metal. Please try oher number.</h4>")
          }
          else {
            var key_ref = await GM.getValue('key_ref', 0);
            // Note awaiting the set -- required so the next get sees this set.
             await GM.setValue('key_ref', document.getElementById('key_ref').value);
             $("#output").html("<h4 class='text-success'>Success, Mann Co. Supply Crate Key is equal to " + await GM.getValue('key_ref', 0) + " Refind metals.</h4>")
          };
        };

        async function f_input_1() {
          // How many keys could I get for this price:
          // Formula: input_1 / key in dollar = Number of keys ($result)
          // Forumla: Result - 10% = How much seller seller gets
          // Forumla: Result * Key in ref = Number of refs user gets
          var user_input = document.getElementById('input_1'). value;
          var key_dollar = await GM.getValue('key_dollar', 0);
          var key_ref = await GM. getValue('key_ref', 0 );
          $('#output').html('For <p class="text-info">' + user_input + ' $</p> you can get <p class="text-info">' + user_input/key_dollar + ' Mann Co. Supply Crate keys</p> (<p class="text-info"> ' + user_input/key_dollar*key_ref + ' refind metals</p>).<br><small>Seller of the keys after 10% commision gets <p class="text-info">' + user_input*0.9 + ' $</p>.</small>')
        }

        async function f_input_2() {
          //I want to buy X keys:
          var user_input = document.getElementById('input_2'). value;
          var key_dollar = await GM.getValue('key_dollar', 0);
          var key_ref = await GM. getValue('key_ref', 0 );
          $('#output').html('For <p class="text-info"> ' + user_input + ' Mann Co. Supply Crate Key</p> (<p class="text-info">' + user_input*key_ref + ' Refind metals</p>) you will need to pay <p class="text-info"> ' + user_input*key_dollar + ' $</p>.')
        }

        async function f_input_3() {
          //How many keys could I get if I sell item for:
          var user_input = document.getElementById('input_3'). value;
          var key_dollar = await GM.getValue('key_dollar', 0);
          var key_ref = await GM. getValue('key_ref', 0 );
          $('#output').html('Item sold for <p class="text-info">' + user_input + ' $</p> gets you <p class="text-info">' + user_input*0.9 + ' $</p> or <p type="text-info">' + user_input*0.9/key_dollar + ' Mann Co. Supply Crate Keys (<p type=text-info>' + user_input*0.9/key_dollar*key_ref + ' Refined Metals</p>).')
        }

        async function f_input_4() {
          //How much cost item if I bough it for (keys):
          var user_input = document.getElementById('input_3'). value;
          var key_dollar = await GM.getValue('key_dollar', 0);
          var key_ref = await GM. getValue('key_ref', 0 );
          $('#output').html('If you bought item for <p class="text-info">' + user_input + ' Mann Co. Supply Crate keys</p> (<p class="text-info">' + user_input*key_ref + ' Refined Metals</p>) costed <p class="text-info">' + user_input*key_dollar + ' $</p>.')
        }
  })();
