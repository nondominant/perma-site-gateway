import os 
endl = os.linesep 

#read in index.html (main file to be processed)
page = [] 
with open('index.html', 'r') as f:
    for line in f:
        page.append(line.strip(endl))
    f.close()
page = ' '.join(page)

#split file at marker
page_arr = page.split('$$$$')

#read in file names from o_temp
files = []
with open('o_temp') as f:
    for line in f:
        files.append(line.strip(endl))
    f.close()

#combine text from main file and script files
fullString = []
current = 0;
temp = []
for paragraph in page_arr:
    fullString.append(paragraph)
    try:
        if len(files[current]) > 0:
            print(files[current])
            with open(files[current], 'r') as f:
                for line in f:
                    temp.append(line.strip(endl))
                f.close()
            temp = ' '.join(temp)
            print(temp)
            fullString.append(temp)
            temp = []
    except:
        print("files array is empty")
    current+=1;

print(fullString)
#write combined text out to file
with open('done_style.html', 'w') as f:
    for line in fullString:
        f.write(line)
    f.close()
