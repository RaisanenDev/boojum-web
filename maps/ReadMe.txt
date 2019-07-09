Boojum Research Technical Reports : Google Maps


Current File Names and Description:

boojum.html		file acts as an index page, with a title and links to the maps

project.html		map indexed by project name
company.html		map indexed by company name
geography.html		map indexed by geographic location

project.txt		file with coordinates and links for project index
company.txt		file with coordinates and links for company index
geography.txt		file with coordinates and links for geography index

projecttext.html	index with project names, text only
companytext.html	index with company names, text only
geographytext.html	index with geogrphic locations, text only


Project:

	The maps provide visual representations of each mine sites that Boojum Research worked on.  The points on each map are idential, it is only the index that changes.
	When users click on a "teardrop" on the map, or on link in the index, a popup opens on the map, and provides information pretaning to that mine site.  This includes, the project name, a relative geographic location, the company that owned the mine at that time, and a date range as to when Boojum Research worked on the project.  Both the project name, and the company name are directly linked to iLink.  As such when a user clicks on the project name, they will be directed to Laurentian's catalogue and find all of the reports associated with that project.  The project name and the company name links sometimes produce idential results for users; however, this is not always the case.
	For users who may not be able use javascript the indexes are also provided, with the same information and functionality, in a text-only version.


Progress:

	All three indexes link properly to the catalogue and function in Internet Explorer and Firefox.


Items to Modify:
	
	The Google key for the map must be changed.
	The links between the HTML files should be changed.


How the map Functions:

	The main html file, for example geography.html, is coded to open geography.txt which contains the information for the links, the location on the map, and all of the metadata.  In the instance where a user does not have javascript enabled a link to geographytext.html will appear on the screen, which is the text only version of the index.
	In the text file all of the component separated by a "|", in the following order: Latitude|Longitude|METADATA: Project name with link to catalogue, (Geographic location), Company name with link to catalogue, years|INDEX ENTRY.


Expansion:

	The map could be greatly improved by removing double entries from the index.  This is only a problem in the company and geography index.  This would eliminate confusion and streamline the look at the map.  At present this problem has been addressed by adding the project name to distinguish each link; however, this is not ideal. 
	Creating one html file with the three indexes may also be helpful.  This will allow users to easily move between the maps without reloading the entire page.  
	Opening the catalogue results in a new tab is another feature that could be helpful.  This was users will not have to click "back" to return to the map.
	The error message for the javascript links to the text only version of each index.  It might be helpful if this index would automatically load, without the table loading on the page.
	The text version of the index hads not been validated (W3.org).
	It might also be interesting to code the text version with frames, so the index will remain on the side of the page (33%), and the remainder of the page will load the links from the catalogue.  However, this will also create the necessity for a <noframes> section.