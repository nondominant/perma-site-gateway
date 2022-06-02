import json 

f = open('config.json', 'rb') 
data = json.load(f)
f.close()

arr = []
with open('index.html', 'r') as f:
    for line in f:
        arr.append(line)
    f.close()

s = ' '.join(arr)

for i in data:
    modified = s.replace(i["url"], i["id"])
    s = ''
    s = modified

print(s)
with open('index.html', 'wb') as f:
    f.write(str.encode(s))
    f.close()



