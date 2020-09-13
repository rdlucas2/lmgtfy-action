# Let me google that for you action

Add this action to your repository to auto reply to issues with a let me google that for you link.

## Inputs

### `github-token`

**Required** Your Github Token used to auth to github rest api, set to: `"${{ secrets.GITHUB_TOKEN }}"`.

## Example usage

```
uses: rdlucas2/lmgtfy-action@v0.0.6
    with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```