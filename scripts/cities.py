import geonamescache

gc = geonamescache.GeonamesCache()
cities = gc.get_cities()
print(cities['581313'])