# WHM and cPanel Virtualhost: Custom Headers for Parked Domains

I use WHM for my VPS and I needed to customize the HTTP `Headers` for domains that I was parking on top of my existing domain.

Specifically, to avoid duplicate content (with my primary domain) I wanted to tell Google not to index the parked domains.

Here's what it took:
1. Modify the DNS of the domains to be parked to point to my custom nameserver.
2. Park the domains (in cPanel or in WHM).
3. Add the code to customize the vhost headers.
4. Run the command-line command over SSH to incorporate the customized code.

How to modify DNS records for nameservers, how to use your own private nameservers in WHM/cPanel, and how to park domains is [adequately documented](http://support.hostgator.com/articles/cpanel/what-is-a-parked-domain-how-do-i-create-and-delete-one).

## From Step 3

Use `SSH` to connect to your server using WHM credentials then create the directory where your customizations will go.

I was parking [ohioad.agency](http://ohioad.agency/) and [columbusad.agency](http://columbusad.agency/) on top of [abacusadvertising.com](http://abacusadvertising.com/) so I needed to add the content of `parked.conf` to the 'include' file for the Virtualhost like so:

```
$ mkdir -p /usr/local/apache/conf/userdata/std/2/gamept/abacusadvertising.com/
```

So then we simply copy (assuming you have already downloaded or saved a copy) `parked.conf` to the directory we created in the previous step.

We end up with the contents of `./parked.conf` residing at

```
/usr/local/apache/conf/userdata/std/2/gamept/abacusadvertising.com/parked.conf
```

The code in `parked.conf` sends a `robots` directive in a header (telling Googlebot not to index the site) whenever it is accessed through the parked domains.

To users the site is fully functional and complete but because Google is prevented from indexing the parked domains they can't be duplicate content.

### One final step to make this take effect:

```
/scripts/ensure_vhost_includes --all-users
```

That will uncomment `parked.conf` so that the code takes effect.
