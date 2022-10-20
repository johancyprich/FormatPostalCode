/// APPLICATION: FormatPostalPhone
/// VERSION: 1.0.0
/// DATE: December 22, 2014
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
/// JavaScript function that formats a postal code according to the user selected style. If a
/// postal code could be parsed, then the function will return an error (NaP).
///
/// PARAMETERS:
/// code (in) - phone number to be formatted
/// style (in) - the format to write the phone number as. The options for style are the following:
///
///              0   No formatting
///              1   CA:1           A9A 9A9
///              2   CA:2           A9A-9A9
///              3   USA            99999 or 99999-9999
///
/// RETURN:
/// Formats a postal code to the user selected style. If postal code is valid, it will be 
/// returned by the function. If it is not valid then the string NaP is returned.

function FormatPostalCode (code, style)
{
  var error = 0;                   // is phone number valid?
  var result = "";                 // final parsed result of postal code
  var parsedCode = "";             // work variable for building parsed postal code
  var ch;                          // single character in tel string
  var len = code.length;;          // length of postal code
  var pattern;                     // postal code format to match
  
  // If postal code is an empty string, exit function and return empty string instead of NaP.
  
  if (code == "")
    return "";
  
  code = code.toUpperCase ();

  // Remove spaces from postal code.
  
  for (i = 0; i <= len - 1; i++)
  { 
    ch = code.charAt (i);
    
    if (ch != " ")
      parsedCode += ch;
  }
  
  parsedCode = parsedCode.replace (/\W/g, '');
  
  // Format postal code according to style.

  switch (style)
  {
    // Don't parse the code string. Just return it.
    case "" :
      result = code;
      break;
      
    // Canada     A9A 9A9
    case "CA:1" :
      pattern = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;  

      if (pattern.exec (parsedCode))
        result = parsedCode.substr (0, 3) + " " + parsedCode.substr (3, 3);        

      else
        error = 1;
      
      break;
    
    // Canada     A9A-9A9
    case "CA:2" :
      pattern = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;  
      
      if (pattern.exec (parsedCode))
        result = parsedCode.substr (0, 3) + "-" + parsedCode.substr (3, 3);        

      else
        error = 1;
      
      break;
      
    // USA     99999 or 99999-9999
    case "USA" :
      pattern = /(^\d{5}$)|(^\d{9}$)/;
      
      if (pattern.exec (parsedCode))
	    {
	      if (parsedCode.length == 5)
	        result = parsedCode;
	      
	      else if (parsedCode.length == 9)
	        result = parsedCode.substr (0, 5) + "-" + parsedCode.substr (5, 4);
      }
      
      else
        error = 1;
      
      break;
     
    // Don't parse the code string. Just return it.      
    default :
      result = code;
  }
  
  // Return parsed postal code if code was valid, or return NaP if code could not be parsed.
  
  switch (error)
  {
    case 0 :
      return result;
      break;
      
    case 1 :
      return "NaP";
      break;
  }
}