import * as cheerio from 'cheerio';
import * as rp from 'request-promise-native';

export function ParseAuctions() {
  const url = 'http://bidfta.com/search?utf8=%E2%9C%93&keywords=&search%5Btagged_with%5D=&location=Columbus%2C+Oh&seller=&button=';
  const proxy = 'http://proxy.us.abb.com:8080';
  const requestOptions = {
    url,
    proxy
  };

  rp(requestOptions)
  .then(bodyString => {
    const $ = cheerio.load(bodyString);
    const auctions = $('.auction');

    console.log(auctions.length);
  });
}

/* 
 
Dim url,strArr,xmlhttp,lineno
Dim texts
Dim AucTitle, AucURL, AucDate, AucTime, AuctionID, AucListingURL, AuctionLocation
Dim Auctions
Dim input
Dim sql

' 
url = "http://localhost/test/current.html" 

set xmlhttp = CreateObject("MSXML2.ServerXMLHTTP") 
xmlhttp.open "GET", url, false 
xmlhttp.send "" 

texts = xmlhttp.responseText
set xmlhttp = nothing 

texts = Right(texts, Len(texts) - InStr(texts, "<div class=""row currentAuctionsListings"">"))
texts = Left(texts, InStr(texts, "<div class=""content"" id=""list""")-1)

strArr = split(texts,"<div class=""medium-4 columns auction"">")

for lineno=1 to ubound(strArr)
input = strArr(lineno)

AucTitle = Left(input, InStr(input, "</h4>")-1)
AucTitle = Right(AucTitle, Len(AucTitle) - InStr(AucTitle,"<h4>")-3)

AucURL = Left(input, InStr(input, """ target=")-1)
AucURL = Right(AucURL, Len(AucURL) - InStr(AucURL,"a href=""")-7)

AuctionID = Right(AucURL, Len(AucURL) - InStr(AucURL, "?"))

AucListingURL = "https://bid.bidfta.com/cgi-bin/mnlist.cgi?" & AuctionID & "/category/ALL"

AucDate = Right(AucTitle, Len(AucTitle) - InStr(AucTitle,"August")+1)

AucTime = Right(input, Len(input) - InStr(input,"Ends: ")-4)
AucTime = Left(AucTime, 12)

If InStr(AucTitle, "Phillipi") > 1 Then	
  AuctionLocation = "Phillipi Rd"
Else
  AuctionLocation = "Williams Rd"
End If

ExpirationDate = CalculateDatetime(AucTitle, AucTime)

sql = "IF NOT EXISTS (SELECT * FROM test.dbo.auctions WHERE auctionid = '" & AuctionID & "') " & _
    "BEGIN " & _
      "INSERT INTO test.dbo.auctions VALUES ('" & AuctionID & "', '" & Replace(AucTitle, "'", "''") & "', '" & AucDate & "', '" & AucTime & "', '" & AucURL & "', '" & AucListingURL & "', (CASE WHEN '" & ExpirationDate & "' > GETDATE() THEN 'Open' ELSE 'Ended' END), '" & AuctionLocation & "', GETDATE(), GETDATE(), '" & ExpirationDate & "')" & _
    "END " & _
  "ELSE " & _
    "BEGIN " & _
      "UPDATE test.dbo.auctions SET auctiontitle = '" & Replace(AucTitle, "'", "''") & "', " & _
      "auctionlocation = '" & AuctionLocation & "', " & _
      "auctionexpiration = '" & ExpirationDate & "', " & _
      "lastupdated = GETDATE(), " & _
      "auctionstatus = (CASE WHEN '" & ExpirationDate & "' > GETDATE() THEN 'Open' ELSE 'Ended' END) " & _
      "WHERE auctionID = '" & AuctionID & "' " & _
    "END"
    
response.write(sql & "<br /><br />")
' Response.Write(AucTitle & "<br />" & ExpirationDate & "<br /><br />")

Connection.Execute(sql)
  
' AucURL = Right(strArr(lineno), InStr(strArr(lineno), "a href="""))
' AucURL = Left(strArr(lineno), InStr(strArr(lineno), """ target="))

' AucUrl = Replace(AucUrl, "<a href=""", "")
' AucUrl = Replace(AucURl, """","")
' Response.Write "Line "&lineno+1&" :"&strArr(lineno)&"<br>"

next

end function

*/
