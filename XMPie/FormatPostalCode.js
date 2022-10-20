/// APPLICATION: FormatPhone for XMPie uStore
/// VERSION: 1.0.0
/// DATE: December 18, 2014
/// AUTHOR: Johan Cyprich
/// AUTHOR URL: www.cyprich.com
/// AUTHOR EMAIL: jcyprich@live.com
/// 
/// LICENSE:
/// The MIT License (MIT)
///
/// Copyright (c) 2014 Johan Cyprich. All rights reserved.
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy 
/// of this software and associated documentation files (the "Software"), to deal
/// in the Software without restriction, including without limitation the rights
/// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
/// copies of the Software, and to permit persons to whom the Software is
/// furnished to do so, subject to the following conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
/// THE SOFTWARE.
///
/// SUMMARY:
/// JavaScript function that formats a phone number according a user selected style. The function
/// extracts all of the numbers from the tel string and tries to build a phone number. If the
/// number of digits extracted is not 10, then the function will return an error.
///
/// PARAMETERS:
/// tel (in) - phone number to be formatted
/// style (in) - the format to write the phone number as. The options for style are the following:
///
///              0   No formatting
///              1   ###-###-####
///              2   ###.###.####
///              3   ### ### ####
///              4   (###) ###-####
///              5   (###) ###.####
///              6   (###) ### ####
///              7   +??#-###-###-####
///              8   +??# (###) ###-####
///
///              where # is a number
///                    ? is an optional number
///
/// RETURN:
/// If a valid phone number was created, it will be returned as a string. Otherwise,
/// the string returned will be NaN is phone number could not be parsed.
///
/// uPLAN SETTINGS:
/// Create FormatPhone as a JavaScript function. Parameters: tel (string), style (number). 

  var error = 0;                   // is phone number valid?
  var result;                      // final parsed result of phone number 
  var len = tel.length;            // length of phone number
  var parsedTel = "";              // work variable for building parsed phone number
  var max = 10;                    // max number of digits allowed in phone number
  var ch;                          // single character in tel string
  var telPos;                      // position of tel after country code
  
  // If tel is an empty string, exit function and return empty string instead of NaN.
  
  if (tel == "")
    return "";
  
  // Extract numbers from tel string.
  
  for (i = 0; i <= len - 1; i++)
  { 
    ch = tel.charAt (i);
    
    // Add ch to parsedTel if its a number and not a space character.
    
    if (!isNaN (ch) && (ch != " "))
      parsedTel += ch;
  }
  
  // Check if length of tel is valid.
  
  len = parsedTel.length;
  
  if ((style == 7) || (style == 8))                            // tel with country code will have 11 to 13 digits
    error = ((len < 11) || (len > 13)) ? 1 : 0;
  
  else                                                         // phone number must have 10 digits
    error = (len != max) ? 1 : 0;
    
  // Format tel according to style.

  switch (style)
  {
    // Don't parse the tel string. Just return it.
    case 0 :
      result = tel;
      break;
      
    // ###-###-####
    case 1 :
      result = parsedTel.substr (0, 3) + "-" + parsedTel.substr (3, 3) + "-" + parsedTel.substr (6, 4);
      break;
    
    // ###.###.####
    case 2 :
      result = parsedTel.substr (0, 3) + "." + parsedTel.substr (3, 3) + "." + parsedTel.substr (6, 4);
      break;
      
    // ### ### ####
    case 3 :
      result = parsedTel.substr (0, 3) + " " + parsedTel.substr (3, 3) + " " + parsedTel.substr (6, 4);
      break;
      
    // (###) ###-####
    case 4 :
      result = "(" + parsedTel.substr (0, 3) + ") " + parsedTel.substr (3, 3) + "-" + parsedTel.substr (6, 4);
      break;
      
    // (###) ###.####
    case 5 :
      result = "(" + parsedTel.substr (0, 3) + ") " + parsedTel.substr (3, 3) + "." + parsedTel.substr (6, 4);
      break;
      
    // (###) ### ####
    case 6 :
      result = "(" + parsedTel.substr (0, 3) + ") " + parsedTel.substr (3, 3) + " " + parsedTel.substr (6, 4);
      break;
    
    // +??#-###-###-####
    case 7 :
      telPos = len - 10;
      result = "+" + parsedTel.substr (0, telPos) + "-" + parsedTel.substr (telPos, 3) + "-" + parsedTel.substr (telPos + 3, 3) + "-" + parsedTel.substr (telPos + 6, 4);
      break;
      
    // +??# (###) ###-####
    case 8 :
      telPos = len - 10;
      result = "+" + parsedTel.substr (0, telPos) + " (" + parsedTel.substr (telPos, 3) + ") " + parsedTel.substr (telPos + 3, 3) + "-" + parsedTel.substr (telPos + 6, 4);
      break;
      
    // Don't parse the tel string. Just return it.      
    default :
      result = tel;
  }
  
  // Return parsed number if tel was valid, or return NaN if tel could not be parsed.
  
  switch (error)
  {
    case 0 :
      return result;
      break;
      
    case 1 :
      return "NaN";
      break;
  }