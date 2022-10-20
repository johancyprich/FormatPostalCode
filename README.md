<h1>SUMMARY</h1>

<p>JavaScript function that formats a postal code according to the user selected style. If a postal code could be parsed, then the function will return an error (NaP).</p>

<h2>PARAMETERS:</h2>

<p>
	code (in) - phone number to be formatted<br />
	style (in) - the format to write the phone number as. The options for style are the following:
</p>

<p>
	0	No formatting<br />
	1	CA:1	A9A 9A9<br />
	2	CA:2	A9A-9A9<br />
	3	USA		99999 or 99999-9999
</p>
			
<h2>RETURN:</h2>

<p>Formats a postal code to the user selected style. If postal code is valid, it will be returned by the function. If it is not valid then the string NaP is returned.</p>