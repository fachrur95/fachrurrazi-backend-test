select
	m.id as id_murid,
	m.name,
	p.status as pendidikan_terakhir,
	m.time_create as time_create,
	p.time_create as time_update
from
	murid m
join (select distinct on (id_murid) id_murid, pend.time_create, pend.status from pendidikan pend order by id_murid, pend.time_create desc) p on
	(p.id_murid = m.id)
order by m.id;