mvn -f ./core/pom.xml liquibase:generateChangeLog \
  -Dliquibase.url=jdbc:postgresql://vps695750.ovh.net:5434/localeat \
  -Dliquibase.username=localeat \
  -Dliquibase.password="Lim0u5in3&4*3veR" \
  -Dliquibase.outputChangeLogFile=changeLog.yaml