from bs4 import BeautifulSoup
import json

htmlFiles = ["coursesA.html", "coursesB.html", "coursesC.html", "coursesDtoF.html", "coursesGtoM.html", "coursesNtoR.html", "coursesStoW.html"]
dict_keys = ["crn", "section", "credits", "title", "days", "time", "instr", "dates", "location", "type"]

courses = {}
for htmlFile in htmlFiles:
    dictionary = {}
    soup = BeautifulSoup(open("courses\\"+htmlFile, encoding="utf8"), "html.parser")

    table = soup.find("table", class_="datadisplaytable")
    table_data = table.find_all("td", class_="dddefault")
    rows = [table_data[x : x + 26] for x in range(0, len(table_data), 26)]

    for row in rows:
        all_elements = []
        course_details = []

        for elem in row:
            all_elements.append(elem.get_text())
        if (all_elements[1] not in courses.keys()):
            courses[all_elements[1]] = {}
        if (all_elements[2] not in courses[all_elements[1]].keys()):
            courses[all_elements[1]][all_elements[2]] = []

        for i in range(len(all_elements)):
            if i in (0, 3, 5, 6, 7, 8, 18, 19, 20, 21):
                course_details.append(all_elements[i])
        courses[all_elements[1]][all_elements[2]].append(dict(zip(dict_keys, course_details)))
    print(courses)

with open('courseDetails.json', 'w') as outfile:
    json.dump(courses, outfile)