<?php
/**
 * @package     Github.Module
 * @subpackage  Card.Table
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

/**
 * Card Table.
 *
 * @package     Github.Module
 * @subpackage  Card.Table
 * @since       1.0
 */
class GithubTableCard extends JTable
{
	/**
	 * @var  integer
	 */
	public $id;

	/**
	 * @var  string
	 */
	public $username;

	/**
	 * @var  string
	 */
	public $profile;

	/**
	 * @var  integer
	 */
	public $created_by;

	/**
	 * @var  string
	 */
	public $created_date;

	/**
	 * @var  integer
	 */
	public $modified_by;

	/**
	 * @var  string
	 */
	public $modified_date;

	/**
	 * @var  integer
	 */
	public $checked_out;

	/**
	 * @var  string
	 */
	public $checked_out_time;

	/**
	 * Ensure the profile in json encoded in the bind method
	 *
	 * @var    array
	 * @since  1.0
	 */
	protected $_jsonEncode = array('profile');

	/**
	 * Constructor
	 *
	 * @param   JDatabaseDriver  &$db  Database connector object
	 *
	 * @since   1.0
	 */
	public function __construct(&$db)
	{
		parent::__construct('#__github_card', 'id', $db);
	}

	/**
	 * Overriden store method to set dates.
	 *
	 * @param   boolean  $updateNulls  True to update fields even if they are null.
	 *
	 * @return  boolean  True on success.
	 *
	 * @since   1.0
	 */
	public function store($updateNulls = false)
	{
		$date = JFactory::getDate()->toSql();

		$this->modified_date = $date;

		if (!$this->id)
		{
			// New record.
			$this->created_date = $date;
		}

		return parent::store($updateNulls);
	}
}
