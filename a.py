import requests

# Replace the placeholder values with your actual information
owner = "shaoyaoqian"
repo = "shaoyaoqian.github.io"
release_id = "RELEASE_ID"

# Token
access_token = "hiq`:Fc3Q2FxQsChBrEP4nVEWcxp6oPzeJ1oUIWw"
access_token = ''.join(map(lambda x:chr(ord(x)-1),access_token))

def get_releaseid_by_tag(tag='v1.0.0'):
    """
    get release id by tag
    """
    # Get all releases for the repository
    response = requests.get(f"https://api.github.com/repos/{owner}/{repo}/releases", headers={"Authorization": f"Token {access_token}"})
    # Check if the response is successful
    if response.status_code == 200:
        releases = response.json()
        for release in releases:
            if release["tag_name"] == tag:
                release_id = release["id"]
                break
    # Print the release id
    print(release_id)
    return release_id



def upload_file_to_release_id(release_id, filename, path = './'):
    url = f"https://uploads.github.com/repos/{owner}/{repo}/releases/{release_id}/assets"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": "Token " + access_token,
        "Content-Type": "application/octet-stream",
    }
    params = {
        "name": filename,
    }
    with open(path+filename, "rb") as f:
        response = requests.post(url, headers=headers, params=params, data=f)

    if response.status_code == 201:
        asset_url = response.json()["browser_download_url"]
        print(f"File uploaded successfully to {asset_url}")
    else:
        print(f"Failed to upload file. Response code: {response.status_code}")


def get_latest_release(repo):
    response = requests.get(f'https://api.github.com/repos/{owner}/{repo}/releases/latest')
    if response.status_code == 200:
        return response.json()
    else:
        return None

release = get_latest_release(repo)
release_id = release['id']
if release:
    print('Latest release:', release['tag_name'])
else:
    print('Error: unable to retrieve latest release')

upload_file_to_release_id(release_id, 'a.py')