<script lang="ts">
	let { data } = $props();

	// Local copy of reservations so deletes update the UI immediately
	let reservations = $state(data.reservations);

	let search = $state('');
	let attendanceFilter = $state<'all' | 'accepted' | 'rejected'>('all');
	let view = $state<'table' | 'list'>('table');
	let expandedId = $state<number | null>(null);

	// Delete state
	let deletingId = $state<number | null>(null);

	const formatDate = (date: Date | string) => {
		return new Date(date).toLocaleString('en-US', {
			dateStyle: 'medium',
			timeStyle: 'short'
		});
	};

	const filtered = $derived(
		reservations.filter((reservation) => {
			const matchesAttendance =
				attendanceFilter === 'all' || reservation.attendance === attendanceFilter;

			const query = search.trim().toLowerCase();
			const matchesSearch =
				query === '' ||
				reservation.fullName?.toLowerCase().includes(query) ||
				reservation.email?.toLowerCase().includes(query) ||
				reservation.phoneNumber?.toLowerCase().includes(query);

			return matchesAttendance && matchesSearch;
		})
	);

	// Total guest count across the currently filtered reservations
	const totalGuests = $derived(
		filtered.reduce((sum, reservation) => sum + (reservation.guestNumber || 0), 0)
	);

	const toggleExpanded = (id: number) => {
		expandedId = expandedId === id ? null : id;
	};

	// Delete a reservation via the DELETE API, then update local state
	async function deleteReservation(id: number) {
		if (!confirm('Delete this reservation? This cannot be undone.')) return;

		deletingId = id;

		try {
			const res = await fetch(`/api/rsvp/${id}`, { method: 'DELETE' });
			const result = await res.json();

			if (!result.success) {
				alert(result.message || 'Failed to delete reservation.');
				return;
			}

			// Remove from local list so the UI updates immediately
			reservations = reservations.filter((r) => r.id !== id);

			if (expandedId === id) expandedId = null;
		} catch (err) {
			console.error('Delete RSVP error:', err);
			alert('Something went wrong while deleting.');
		} finally {
			deletingId = null;
		}
	}

	// Escape a value for safe inclusion in a CSV cell
	function csvEscape(value: unknown): string {
		const str = value === null || value === undefined ? '' : String(value);
		if (/[",\n]/.test(str)) {
			return `"${str.replace(/"/g, '""')}"`;
		}
		return str;
	}

	// Export the currently filtered reservations as a CSV report
	// (excludes Message and Submitted columns, per requirements)
	function exportReport() {
		const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Attendance', 'Guests'];

		const rows = filtered.map((reservation) => [
			reservation.id,
			reservation.fullName,
			reservation.email || '',
			reservation.phoneNumber || '',
			reservation.attendance,
			reservation.guestNumber
		]);

		const csvContent = [headers, ...rows]
			.map((row) => row.map(csvEscape).join(','))
			.join('\n');

		// Prepend BOM so Excel opens UTF-8 CSVs correctly
		const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = `rsvp-report-${new Date().toISOString().slice(0, 10)}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	}
</script>

<svelte:head>
	<title>Wedding RSVP Admin</title>
	<meta
		name="description"
		content="Wedding RSVP administration"
	/>
</svelte:head>

<div class="admin-page">
	<div class="admin-container">
		<div class="admin-header">
			<div>
				<h1>RSVP Reservations</h1>
				<p>People who submitted their wedding RSVP</p>
			</div>

			<div class="stats">
				<div class="total">
					<span>{filtered.length}</span>
					<small>{filtered.length === reservations.length ? 'Reservations' : `of ${reservations.length}`}</small>
				</div>

				<div class="total">
					<span>{totalGuests}</span>
					<small>Total Guests</small>
				</div>

				<button class="export-btn" onclick={exportReport} aria-label="Export report">
					<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
						<path d="M10 3v9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
						<path d="M6.5 8.5L10 12l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M3.5 14.5v1.2c0 .72.58 1.3 1.3 1.3h10.4c.72 0 1.3-.58 1.3-1.3v-1.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					Export
				</button>
			</div>
		</div>

		<div class="controls">
			<div class="search-wrap">
				<svg class="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
					<circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.6" />
					<path d="M14 14L18 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				</svg>
				<input
					type="text"
					placeholder="Search by name, email or phone…"
					bind:value={search}
					aria-label="Search reservations"
				/>
				{#if search}
					<button class="clear" onclick={() => (search = '')} aria-label="Clear search">
						<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
							<path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
						</svg>
					</button>
				{/if}
			</div>

			<div class="filter-group">
				<button
					class:active={attendanceFilter === 'all'}
					onclick={() => (attendanceFilter = 'all')}
				>
					All
				</button>
				<button
					class:active={attendanceFilter === 'accepted'}
					onclick={() => (attendanceFilter = 'accepted')}
				>
					Attending
				</button>
				<button
					class:active={attendanceFilter === 'rejected'}
					onclick={() => (attendanceFilter = 'rejected')}
				>
					Not attending
				</button>
			</div>

			<div class="view-toggle" role="group" aria-label="View mode">
				<button class:active={view === 'table'} onclick={() => (view = 'table')} aria-label="Table view">
					<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
						<rect x="2.5" y="3.5" width="15" height="13" rx="1.5" stroke="currentColor" stroke-width="1.4" />
						<path d="M2.5 8H17.5" stroke="currentColor" stroke-width="1.4" />
						<path d="M7.5 8V16.5" stroke="currentColor" stroke-width="1.4" />
					</svg>
					Table
				</button>
				<button class:active={view === 'list'} onclick={() => (view = 'list')} aria-label="List view">
					<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
						<circle cx="4" cy="5.5" r="1.2" fill="currentColor" />
						<circle cx="4" cy="10" r="1.2" fill="currentColor" />
						<circle cx="4" cy="14.5" r="1.2" fill="currentColor" />
						<path d="M7.5 5.5H17" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
						<path d="M7.5 10H17" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
						<path d="M7.5 14.5H17" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
					</svg>
					List
				</button>
			</div>
		</div>

		{#if view === 'table'}
			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Full Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Attendance</th>
							<th>Guests</th>
							<th>Message</th>
							<th>Submitted</th>
						</tr>
					</thead>

					<tbody>
						{#each filtered as reservation}
							<tr>
								<td>{reservation.id}</td>

								<td class="name">
									{reservation.fullName}
								</td>

								<td>
									{reservation.email || '—'}
								</td>

								<td>
									{reservation.phoneNumber || '—'}
								</td>

								<td>
									<span
										class:accepted={reservation.attendance === 'accepted'}
										class:rejected={reservation.attendance === 'rejected'}
										class="status"
									>
										{reservation.attendance}
									</span>
								</td>

								<td>
									{reservation.guestNumber}
								</td>

								<td class="message">
									{reservation.message || '—'}
								</td>

								<td>
									{formatDate(reservation.createdAt)}
								</td>
							</tr>
						{:else}
							<tr>
								<td colspan="8" class="empty">
									No reservations match your search.
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="list-wrapper">
				{#each filtered as reservation}
					<div class="list-item" class:expanded={expandedId === reservation.id}>
						<button class="list-row" onclick={() => toggleExpanded(reservation.id)}>
							<span class="chevron" class:open={expandedId === reservation.id}>›</span>
							<span class="list-name">{reservation.fullName}</span>
							<span
								class:accepted={reservation.attendance === 'accepted'}
								class:rejected={reservation.attendance === 'rejected'}
								class="status"
							>
								{reservation.attendance}
							</span>
							<span class="list-guests">{reservation.guestNumber} guest{reservation.guestNumber === 1 ? '' : 's'}</span>
						</button>

						{#if expandedId === reservation.id}
							<div class="list-details">
								<div class="detail">
									<small>Email</small>
									<span>{reservation.email || '—'}</span>
								</div>
								<div class="detail">
									<small>Phone</small>
									<span>{reservation.phoneNumber || '—'}</span>
								</div>
								<div class="detail">
									<small>Guests</small>
									<span>{reservation.guestNumber}</span>
								</div>
								<div class="detail">
									<small>Submitted</small>
									<span>{formatDate(reservation.createdAt)}</span>
								</div>
								<div class="detail message-detail">
									<small>Message</small>
									<span>{reservation.message || '—'}</span>
								</div>

								<div class="detail message-detail delete-detail">
									<button
										class="delete-btn"
										onclick={() => deleteReservation(reservation.id)}
										disabled={deletingId === reservation.id}
									>
										{deletingId === reservation.id ? 'Deleting…' : 'Delete Reservation'}
									</button>
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<div class="empty">No reservations match your search.</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.admin-page {
		min-height: 100vh;
		background: #faf7f5;
		padding: 40px 20px;
		box-sizing: border-box;
	}

	.admin-container {
		width: min(1400px, 100%);
		margin: 0 auto;
	}

	.admin-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 30px;
	}

	h1 {
		margin: 0;
		color: #9d5a4f;
		font-size: 32px;
	}

	.admin-header p {
		margin: 8px 0 0;
		color: #777;
	}

	.stats {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.total {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 100px;
		padding: 12px 20px;
		border: 1px solid #e6d7d3;
		border-radius: 12px;
		background: white;
	}

	.total span {
		color: #9d5a4f;
		font-size: 28px;
		font-weight: 700;
	}

	.total small {
		color: #777;
		white-space: nowrap;
	}

	.export-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 100%;
		padding: 12px 18px;
		border: 1px solid #9d5a4f;
		background: #9d5a4f;
		color: white;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.15s ease, border-color 0.15s ease;
	}

	.export-btn svg {
		width: 16px;
		height: 16px;
	}

	.export-btn:hover {
		background: #874d43;
		border-color: #874d43;
	}

	/* Controls */

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
	}

	.search-wrap {
		flex: 1 1 260px;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		box-sizing: border-box;
		width: 100%;
		padding: 0 12px;
		border: 1px solid #e6d7d3;
		border-radius: 10px;
		background: white;
		transition: border-color 0.15s ease;
	}

	.search-wrap:focus-within {
		border-color: #c98c7e;
	}

	.search-icon {
		flex: 0 0 16px;
		width: 16px;
		height: 16px;
		color: #b79b94;
		pointer-events: none;
	}

	.search-wrap input {
		flex: 1 1 auto;
		min-width: 0;
		width: 100%;
		box-sizing: border-box;
		border: none;
		background: transparent;
		padding: 11px 0;
		font-size: 16px;
		color: #444;
		outline: none;
	}

	.search-wrap input::placeholder {
		color: #b8a8a3;
	}

	.clear {
		flex: 0 0 20px;
		width: 20px;
		height: 20px;
		padding: 0;
		border: none;
		background: #f2e7e4;
		color: #9d5a4f;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clear svg {
		width: 10px;
		height: 10px;
	}

	.filter-group {
		display: flex;
		gap: 6px;
		padding: 4px;
		background: white;
		border: 1px solid #e6d7d3;
		border-radius: 10px;
	}

	.filter-group button {
		border: none;
		background: transparent;
		padding: 8px 14px;
		border-radius: 7px;
		font-size: 13px;
		font-weight: 600;
		color: #927670;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.15s ease, color 0.15s ease;
	}

	.filter-group button.active {
		background: #9d5a4f;
		color: white;
	}

	.view-toggle {
		display: flex;
		gap: 6px;
		padding: 4px;
		background: white;
		border: 1px solid #e6d7d3;
		border-radius: 10px;
	}

	.view-toggle button {
		display: flex;
		align-items: center;
		gap: 6px;
		border: none;
		background: transparent;
		padding: 8px 12px;
		border-radius: 7px;
		font-size: 13px;
		font-weight: 600;
		color: #927670;
		cursor: pointer;
	}

	.view-toggle button svg {
		width: 15px;
		height: 15px;
	}

	.view-toggle button.active {
		background: #f7efed;
		color: #9d5a4f;
	}

	/* Table */

	.table-wrapper {
		width: 100%;
		overflow-x: auto;
		background: white;
		border: 1px solid #eadeda;
		border-radius: 14px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
	}

	table {
		width: 100%;
		min-width: 1100px;
		border-collapse: collapse;
	}

	th {
		padding: 16px;
		text-align: left;
		background: #f7efed;
		color: #70433c;
		font-size: 13px;
		font-weight: 600;
		white-space: nowrap;
	}

	td {
		padding: 15px 16px;
		border-top: 1px solid #eee;
		color: #555;
		font-size: 14px;
		vertical-align: middle;
	}

	tr:hover td {
		background: #fdfafa;
	}

	.name {
		color: #333;
		font-weight: 600;
	}

	.message {
		max-width: 250px;
	}

	.status {
		display: inline-flex;
		padding: 5px 10px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		text-transform: capitalize;
	}

	.status.accepted {
		background: #e8f4ec;
		color: #34734a;
	}

	.status.rejected {
		background: #f8e8e8;
		color: #a44b4b;
	}

	.empty {
		padding: 50px;
		text-align: center;
		color: #999;
	}

	/* List view */

	.list-wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.list-item {
		background: white;
		border: 1px solid #eadeda;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
	}

	.list-row {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 18px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font: inherit;
	}

	.list-row:hover {
		background: #fdfafa;
	}

	.chevron {
		color: #b79b94;
		font-size: 18px;
		transition: transform 0.15s ease;
		flex-shrink: 0;
	}

	.chevron.open {
		transform: rotate(90deg);
	}

	.list-name {
		flex: 1;
		color: #333;
		font-weight: 600;
		font-size: 15px;
	}

	.list-guests {
		color: #999;
		font-size: 13px;
		white-space: nowrap;
	}

	.list-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 16px;
		padding: 4px 18px 20px 46px;
		border-top: 1px solid #f2e9e6;
		margin-top: 2px;
		padding-top: 16px;
	}

	.detail {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.detail small {
		color: #b79b94;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.detail span {
		color: #555;
		font-size: 14px;
	}

	.message-detail {
		grid-column: 1 / -1;
	}

	.delete-detail {
		display: flex;
		justify-content: flex-end;
	}

	.delete-btn {
		border: 1px solid #e0a8a8;
		background: #fdf1f1;
		color: #a44b4b;
		font-size: 13px;
		font-weight: 600;
		padding: 8px 14px;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.delete-btn:hover:not(:disabled) {
		background: #f8e0e0;
	}

	.delete-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 600px) {
		.admin-page {
			padding: 25px 12px;
		}

		.admin-header {
			align-items: flex-start;
			flex-direction: column;
		}

		.stats {
			width: 100%;
			flex-wrap: wrap;
		}

		.export-btn {
			flex: 1 1 auto;
			justify-content: center;
		}

		h1 {
			font-size: 25px;
		}

		.controls {
			flex-direction: column;
			align-items: stretch;
		}

		.search-wrap {
			flex: none;
			align-self: flex-start;
			width: auto;
			min-width: 200px;
			max-width: 100%;
		}

		.filter-group,
		.view-toggle {
			justify-content: space-between;
		}

		.filter-group button,
		.view-toggle button {
			flex: 1;
			justify-content: center;
		}
	}
</style>